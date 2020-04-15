import os
import pickle
import time
from contextlib import contextmanager
from pathlib import Path

from invoke import task


@task
def clean_pyc(c):
    """remove *.pyc cache files"""
    # c.run(r"find . -name '*.pyc' -delete")
    c.run(r"python manage.py clean_pyc")


@task
def check_format(c, path="server"):
    c.run(f"isort -rc {path} --check-only")
    c.run(f"black {path} --check")


@task
def lint(c, path="server", pylint=True, xenon=True, format=True):
    # check code is formatted

    if format:
        check_format(c, path)
    c.run(f"flake8 {path}")
    if pylint:
        # Running linting for all python files in the project:
        c.run(f"pylint {path}")
    # type check project
    c.run(f"mypy {path}")
    if xenon:
        # Running code-quality check:
        c.run(f"xenon --max-absolute A --max-modules A --max-average A {path}")


@task
def check(c):
    """Check Django project settings"""
    # Run checks to be sure settings are correct (production flag is required):
    c.run("DJANGO_ENV=production python manage.py check --deploy --fail-level WARNING")
    # Check that staticfiles app is working fine:
    c.run("DJANGO_ENV=production python manage.py collectstatic --no-input --dry-run")
    # Check that all migrations worked fine:
    c.run("python manage.py makemigrations --dry-run --check")


@task
def security_checks(c):
    # Checking if all the dependencies are secure and do not have any
    # known vulnerabilities:
    c.run("safety check --full-report")

    # # Checking `pyproject.toml` file contents and dependencies status:
    # c.run("poetry check && pip check")


@task
def lint_others(c):
    """lint non-python files"""
    # Checking docs:
    # c.run("doc8 -q docs")

    # Checking `yaml` files:
    c.run("yamllint -s .")

    # Checking `.env` files:
    c.run("dotenv-linter server/.env")
    #   # Checking translation files, ignoring ordering and locations:
    #   polint -i location,unsorted locale
    #
    #   # Also checking translation files for syntax errors:
    #   if find locale -name '*.po' -print0 | grep -q "."; then
    #     # Only executes when there is at least one `.po` file:
    #     dennis-cmd lint --errorsonly locale
    #   fi


@task
def test(
    c,
    run_lint=True,
    run_checks=True,
    security_check=True,
    lint_other=True,
    report=True,
    path="server",
):
    """
      Run tests, linters, type checkers etc.
    """
    clean_pyc(c)

    if run_lint:
        lint(c, pylint=False, xenon=False)
    if run_checks:
        check(c)
    if security_check:
        security_checks(c)
    if lint_other:
        lint_others(c)

    # run tests
    # c.run("pytest --dead-fixtures --dup-fixtures")
    c.run(
        "pytest "
        f" --cov={path}  "
        " --create-db  "  # create test db even if it is available already
        # " -n 2 "
        f" {'--junitxml=pytest-report.xml' if report else ''} "
        # " --boxed "
    )


@contextmanager
def environ(env: dict):
    original_environ = os.environ.copy()
    os.environ.update(env)
    yield
    os.environ = original_environ


@task
def dc(c, env, cmd, service, args=""):
    compose = "docker-compose -f docker-compose.yml" + (
        f" -f docker/docker-compose.{env}.yml" if env else ""
    )
    return c.run(f"{compose} {cmd} {service} {args}", echo=True)


@task(iterable=["service"])
def dc_build(c, service, env="prod"):
    # with environ({"COMPOSE_DOCKER_CLI_BUILD": "1", "DOCKER_BUILDKIT": "1"}):
    for srv in service:
        dc(c, env, "pull", srv)
        c.run("docker images")
        dc(c, env, "build", srv)
        dc(c, env, "push", srv)
    c.run("docker images")


@task
def dc_run(c, service, env="prod", args=""):
    dc(c, env, "run --rm", service, args)


@task
def flake8(c):
    DATA = os.path.join(os.getcwd(), ".cache", "FLAKE8.pkl")
    checked_files = []
    if os.path.exists(DATA):
        with open(DATA, "rb") as fr:
            checked_files = pickle.loads(fr.read())
    last_run = time.time()
    all_files = list(Path("server").glob("**/*.py"))
    for idx, file in enumerate(all_files):
        print(f"Checking {idx}/{len(all_files)}")
        if file in checked_files:
            continue

        try:
            c.run(f"flake8 {file} --count")
            print("Took, ", time.time() - last_run)
            last_run = time.time()
            checked_files.append(file)
        except Exception as ex:
            print("Took, ", time.time() - last_run)
            with open(DATA, "wb") as fw:
                fw.write(pickle.dumps(checked_files))
            raise ex
    os.remove(DATA)

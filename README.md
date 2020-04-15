# saturation_fc

saturation forecaster

This project was generated with [`wemake-django-template`](https://github.com/wemake-services/wemake-django-template). Current template version is: [86df578e2bcbff2ad530a53346201d10a8969671](https://github.com/wemake-services/wemake-django-template/tree/86df578e2bcbff2ad530a53346201d10a8969671). See what is [updated](https://github.com/wemake-services/wemake-django-template/compare/86df578e2bcbff2ad530a53346201d10a8969671...master) since then.


[![wemake.services](https://img.shields.io/badge/%20-wemake.services-green.svg?label=%20&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC%2FxhBQAAAAFzUkdCAK7OHOkAAAAbUExURQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP%2F%2F%2F5TvxDIAAAAIdFJOUwAjRA8xXANAL%2Bv0SAAAADNJREFUGNNjYCAIOJjRBdBFWMkVQeGzcHAwksJnAPPZGOGAASzPzAEHEGVsLExQwE7YswCb7AFZSF3bbAAAAABJRU5ErkJggg%3D%3D)](https://wemake.services) [![build status](https://gitlab.com/divisible_global/saturation_fc/badges/master/build.svg)](https://gitlab.com/divisible_global/saturation_fc/commits/master) [![coverage report](https://gitlab.com/divisible_global/saturation_fc/badges/master/coverage.svg)](https://gitlab.com/divisible_global/saturation_fc/commits/master) [![wemake-python-styleguide](https://img.shields.io/badge/style-wemake-000000.svg)](https://github.com/wemake-services/wemake-python-styleguide)



## Prerequisites

You will need:

- `python3.7` (see `pyproject.toml` for full version)
- `postgresql` with version `9.6`
- `docker` with [version at least](https://docs.docker.com/compose/compose-file/#compose-and-docker-compatibility-matrix) `18.02`


## Development

When developing locally, we use:

- [`editorconfig`](http://editorconfig.org/) plugin (**required**)
- [`poetry`](https://github.com/sdispater/poetry) (**required**)
- `pycharm 2017+` or `vscode`

**Note:** 
1. to speedup docker builds enable [buildkit](https://www.docker.com/blog/faster-builds-in-compose-thanks-to-buildkit-support/) feature
1. if the network is slow inside docker container then 
update DNS of docker daemon e.g. `{"dns": "8.8.8.8"}`. 

## Documentation

Full documentation is available here: [`docs/`](docs).


## Running tests

pytest is the preferred way to run tests.
```sh
pytest
```

if you want to test only unit-tests
```sh
env DJANGO_ENV=testing python manage.py test
```

## Python Code Formatting

- black is used. (pre-commit needs to used to ensure all validations checked while committing code)

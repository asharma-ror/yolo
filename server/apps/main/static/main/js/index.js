var dropZone = null
$('#file-downloader').click(function () {
  if (Dropzone && Dropzone.instances && Dropzone.instances.length) {
    dropZone = Dropzone.instances[0]
  }
  var $btn = $(this)
  if (dropZone) {
    var fileName = null
    for (var idx = 0; idx < dropZone.files.length; idx++) {
      var file = dropZone.files[idx]
      if (file.status === 'success') {
        fileName = file.name
        break
      }
    }
    if (fileName) {
      $btn.addClass('is-loading')
      $.get(window.fileUploadUrl, { fileName: fileName }).done(function (resp) {
        $btn.removeClass('is-loading')
        window.open(resp.fileUrl, '_blank')
      }).fail(function (jqXHR, textStatus, error) {
        console.log(jqXHR, textStatus, error)
        $btn.removeClass('is-loading')
        new Noty({
          type: 'error',
          timeout: 20000,
          text: textStatus.toString() + 'Download failed. ' + error.toString(),
        }).show()
      })
      return
    }
  }

  // no file case
  new Noty({
    type: 'error',
    timeout: 2000,
    text: 'No Files got uploaded',
  }).show()
})

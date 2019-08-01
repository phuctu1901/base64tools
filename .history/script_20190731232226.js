document.getElementById('button').addEventListener('click', function () {
  var files = document.getElementById('file').files;
  if (files.length > 0) {
    getBase64(files[0]);
  }
});

document.getElementById('convert2file').addEventListener('click', function () {
  var data = document.getElementById('base64string').value;
  var file = dataURLtoFile(data, 'tailieu');
  console.log(file);
  open(file, file.type)
  //   download(file, file.name, file.type)
  console.log('123');
});


function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
    //   open(file, file.type)

    var file = dataURLtoFile(reader.result, 'tailieu');
    console.log(file);
    open(file, file.type)

    //      download(file, file.name, file.type)
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime
  });
}

function download(data, filename, type) {
  var file = new Blob([data], {
    type: type
  });
  if (window.navigator.msSaveOrOpenBlob) // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

function open(data, type) {
  var reader = new FileReader();
  var out = new Blob([data], {
    type: type
  });
  reader.onload = function (e) {
    let newWindow = window.open('/')
    newWindow.onload = () => {
      newWindow.location = URL.createObjectURL(out);
  };
    alert(reader.result);
  }
  reader.readAsDataURL(out);
}
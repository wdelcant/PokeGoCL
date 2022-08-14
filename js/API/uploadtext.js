window.onLoad = handleClientLoad();



let CLIENT_ID = 'http://285791739295-gatnlhtmsfrjnpuk44tu72j1kd8mr3eo.apps.googleusercontent.com';
let API_KEY = 'AIzaSyASgC40HnjZPwRZ5Jy8VUpw_Vj6IVvXuLc';
let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
let SCOPES = 'https://www.googleapis.com/auth/drive.images.readonly';
let $login = document.getElementById('login')[0];
let $logout = document.getElementById('logout')[0];

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        $login.onclick = handleLogin;
        $logout.onclick = handleLogout;
    }, function (error) {
        console.log(error);
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        $login.style.display = 'none';
        $logout.style.display = 'block';
        checkFolder();
    } else {
        $login.style.display = 'block';
        $logout.style.display = 'none';
    }
}

function handleLogin() {
    gapi.auth2.getAuthInstance().signIn();
}

function handleLogout() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        location.reload();
        console.log('User signed out.');
    });
    auth2.disconnect();
}

function checkFolder() {
    gapi.client.drive.files.list({
        'q': 'name = "Backup Folder"',
    }).then(function (response) {
        let files = response.result.files;
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                localStorage.setItem('parent_folder', file.id);
                console.log('Folder Available');
            }

        } else {
            console.log('Folder Not Available');
            createFolder();
        }
    });
}

function uploadFile(file) {
    let text = document.querySelector('textarea');
    if (text.value != '') {
        const blob = new Blob([text.value], {
            type: 'text/plain'
        });
        const parentFolder = localStorage.getItem('parent_folder');

        let metadata = {
            name: 'backup-file-' + String(Math.random() * 10000).split('.')[0] + '.txt',
            mimeType: 'text/plain',
            parents: [parentFolder]
        };
        let formData = new FormData();
        formData.append('metadata', new Blob([JSON.stringify(metadata)], {
            type: 'application/json'
        }));
        formData.append('file', blob);

        fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
            method: 'POST',
            header: new Headers({
                'Authorization': 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token,
                body: formData
            }).then(function (response) {
                return response.json();
            }).then(function (value) {
                console.log(value);
            })
        });

    }
}


function createFolder() {
    let access_token = gapi.auth.getToken().access_token;
    let request = gapi.client.request({
        'path': 'drive/v2/files',
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
        'body': {
            'title': 'Backup Folder',
            'mimeType': 'application/vnd.google-apps.folder'
        }
    });
    request.execute(function (response) {
        localStorage.setItem('parent_folder', response.id);
        console.log('Folder Created');
    });
}
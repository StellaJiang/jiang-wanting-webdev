/**
 * Created by Wanting on 10/25/16.
 */

module.exports = function(app) {
    var widgets = [
        { "_id": "0", "widgetType": "HEADER", "typeName": "Header", "type": true},
        { "_id": "1", "widgetType": "LABEL", "typeName": "Label", "type": true},
        { "_id": "2", "widgetType": "HTML", "typeName": "HTML", "type": true},
        { "_id": "3", "widgetType": "TEXT-INPUT", "typeName": "Text Input", "type": true},
        { "_id": "4", "widgetType": "LINK", "typeName": "Link", "type": true},
        { "_id": "5", "widgetType": "BUTTON", "typeName": "Button", "type": true},
        { "_id": "6", "widgetType": "IMAGE", "typeName": "Image", "type": true},
        { "_id": "7", "widgetType": "YOUTUBE", "typeName": "Youtube", "type": true},
        { "_id": "8", "widgetType": "DATA-TABLE", "typeName": "Data Table", "type": true},
        { "_id": "9", "widgetType": "REPEATER", "typeName": "Repeater", "type": true},
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+'/../../public/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '.' + file.mimetype.split("/")[1])
        }
    });
    var upload = multer({ storage: storage });
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.get('/api/types', findAllTypes);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.get('/api/tempImage/:uid', findTempImage);
    app.put('/page/:pageId/widget', sortItem);
    app.delete('/api/deleteTempImage/:uid', deleteTempImage);


    function createWidget(req, res){
        var widget = req.body;
        var pageId = req.params.pageId;
        pageId.toString();
        var last_widget_id = parseInt(widgets[widgets.length - 1]._id) + 1;
        last_widget_id.toString();
        widget["_id"] = last_widget_id;
        widget["pageId"] = pageId;
        widgets.push(widget);
        res.send(widget);
    }

    function findAllWidgetsForPage(req, res){
        var pageId = parseInt(req.params.pageId);
        var widgetList = [];
        var idx = 0;
        for(var i = 0; i < widgets.length; i++) {
            if(parseInt(widgets[i].pageId) === pageId) {
                widgetList[idx++] = widgets[i];
            }
        }
        res.send(widgetList);
    }

    function findWidgetById(req, res){
        var widgetId = parseInt(req.params.widgetId);
        for(var i = 0; i < widgets.length; i++) {
            if(parseInt(widgets[i]._id) === widgetId) {
                res.send(widgets[i]);
                return;
            }
        }
        res.send('0');
    }

    function updateWidget(req, res){
        var widget = req.body;
        var widgetId = parseInt(req.params.widgetId);
        for(var i = 0; i < widgets.length; i++) {
            if(parseInt(widgets[i]._id) === widgetId) {
                widgets[i] = widget;
                res.send(widget);
                return;
            }
        }
        res.send('0');
    }

    function deleteWidget(req, res){
        var widgetId = parseInt(req.params.widgetId);
        for(var i = 0; i < widgets.length; i++) {
            if(parseInt(widgets[i]._id) === widgetId) {
                widgets.splice(i, 1);
                res.send('1');
                return;
            }
        }
        res.send('0');
    }

    function findAllTypes(req, res){
        var types = [];
        var idx = 0;
        for(var i = 0; i < widgets.length; i++) {
            if(widgets[i].type) {
                types[idx++] = widgets[i];
            }
        }
        res.send(types);
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var uid = req.body.uid;
        var wid = req.body.wid;
        var pid = req.body.pid;
        var url = "/assignment/index.html#/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + widgetId;
        var find = false;
        for (var i = 0; i < widgets.length; i++) {
            if (parseInt(widgets[i].uid) === parseInt(uid)) {
                widgets[i].url = '/../../uploads/' + myFile.filename;
                find = true;
                break;
            }
        }

        if (!find) {
            var temp = {};
            var last_widget_id = parseInt(widgets[widgets.length - 1]._id) + 1;
            last_widget_id.toString();
            temp["_id"] = last_widget_id;
            temp["uid"] = uid;
            temp["url"] = '/../../uploads/' + myFile.filename;
            widgets.push(temp);
        }
        res.redirect(url);
    }

    function findTempImage(req, res) {
        var uid = parseInt(req.params.uid);
        for(var i = 0; i < widgets.length; i++) {
            if(parseInt(widgets[i].uid) === uid) {
                res.send(widgets[i]);
                return;
            }
        }
        res.send("0");
    }

    function deleteTempImage(req, res){
        var uid = parseInt(req.params.uid);
        for(var i = 0; i < widgets.length; i++) {
            if(parseInt(widgets[i].uid) === uid) {
                widgets.splice(i, 1);
                res.send('1');
                return;
            }
        }
        res.send('0');
    }

    function sortItem(req, res) {
        var start = req.body.start;
        var end = req.body.end;

        var pageId = parseInt(req.params.pageId);
        var moved = null;
        var idx = 0;
        for(var i = 0; i < widgets.length; i++) {
            if(parseInt(widgets[i].pageId) === pageId) {
                if(idx < start) {
                    idx++;
                }
                else {
                    moved = widgets.splice(i, 1)[0];
                    break;
                }
            }
        }

        var count = 0;
        var i = 0;
        for(; i < widgets.length; i++) {
            if(parseInt(widgets[i].pageId) === pageId) {
                if(count < end) {
                    count++;
                }
                else {
                    break;
                }
            }
        }
        widgets.splice(i, 0, moved);
        res.sendStatus(200);
    }
};
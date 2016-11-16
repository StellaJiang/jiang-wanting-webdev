/**
 * Created by Wanting on 10/25/16.
 */

module.exports = function(app, model) {
    /*var widgets = [
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
    ];*/

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
        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets){
                    if(widgets){
                        widget["priority"] = parseInt(widgets.length + 1);
                        model
                            .widgetModel
                            .createWidget(pageId, widget)
                            .then(
                                function(newWidget){
                                    res.send(newWidget);

                                },
                                function(error){
                                    res.sendStatus(400).send(error);
                                }
                            );
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllWidgetsForPage(req, res){
        var pageId = req.params.pageId;
        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets){
                    if(widgets){
                        res.json(widgets);
                    }
                    else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;
        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget){
                    if(widget){
                        res.send(widget);
                    }
                    else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateWidget(req, res){
        var widget = req.body;
        var widgetId = req.params.widgetId;
        model
            .widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteWidget(req, res){
        var widgetId = req.params.widgetId;
        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget){
                    if(widget){
                        model
                            .widgetModel
                            .updatePriorityWhenDel(widget._page, widget.priority)
                            .then(
                                function(){
                                },
                                function(error){
                                    res.sendStatus(400).send(error);
                                }
                            );
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

        model
            .widgetModel
            .deleteWidget(widgetId)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllTypes(req, res){
        model
            .widgetModel
            .findAllTypes()
            .then(
                function(types){
                    if(types){
                        res.json(types);
                    }
                    else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
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
        model
            .widgetModel
            .uploadImage(uid, filename)
            .then(
                function(image){
                    if(image) {
                        res.redirect(url);
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findTempImage(req, res) {
        var uid = req.params.uid;
        model
            .widgetModel
            .findTempImage(uid)
            .then(
                function(image){
                    if(image.length > 0) {
                        res.send(image[0]);
                    }
                    else {
                        res.send("0");
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteTempImage(req, res){
        var uid = req.params.uid;
        model
            .widgetModel
            .deleteTempImage(uid)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function sortItem(req, res) {
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);

        var pageId = req.params.pageId;

        model
            .widgetModel
            .sortWidget(pageId, start, end)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }
};
/**
 * Created by Wanting on 12/6/16.
 */

module.exports = function(app, model) {

    app.get('/api/review/all', getAllReviews);
    app.get('/api/review/:mid', findReviewByMovieId);
    app.post('/api/review', addReview);
    app.get('/api/review/list/:uid', findReviewByUserId);
    app.get('/api/review/detail/:rid', findReviewById);
    app.post('/api/review/update/:rid', updateReview);
    app.delete('/api/review/:rid', deleteReview);


    function findReviewByMovieId(req, res){
        var mid = req.params.mid;
        model
            .reviewModel
            .findReviewByMovieId(mid)
            .then(
                function(reviews){
                    if(reviews) {
                        res.send(reviews);
                    } else {
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function addReview(req, res){
        var myReview = req.body;
        model
            .reviewModel
            .addReview(myReview)
            .then(
                function(review){
                    if(review) {
                        res.send(review);
                    } else {
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findReviewByUserId(req, res){
        var uid = req.params.uid;
        model
            .reviewModel
            .findReviewByUserId(uid)
            .then(
                function(reviews){
                    if(reviews) {
                        res.send(reviews);
                    } else {
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findReviewById(req, res){
        var rid = req.params.rid;
        model
            .reviewModel
            .findReviewById(rid)
            .then(
                function(review){
                    if(review) {
                        res.send(review);
                    } else {
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateReview(req, res){
        var rid = req.params.rid;
        var myReview = req.body;
        model
            .reviewModel
            .updateReview(rid, myReview.review)
            .then(
                function(review){
                    if(review) {
                        res.send(review);
                    } else {
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteReview(req, res){
        var rid = req.params.rid;
        model
            .reviewModel
            .deleteReview(rid)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getAllReviews(req, res) {
        model
            .reviewModel
            .getAllReviews()
            .then(
                function(reviews){
                    if(reviews) {
                        res.send(reviews);
                    } else {
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }
}
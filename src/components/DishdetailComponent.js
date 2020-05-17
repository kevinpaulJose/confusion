import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';



    function RenderDish({dish}) {
        if(dish!=null){
            return (
                <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
            );
        }else{
            return (
                <div></div>
            );
        }

    }

    function RenderComments({comments}) {
        if(comments!=null){

            const commentsList = comments.map((comment) => {
                return (
                    <li key={comment.id}>
                        {comment.comment}
                        <br></br>
                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        <br></br>
                    </li>
                );
            });
            return (
                <div className="col-12 col-md-5 m-1">
                            <div>
                                <h4>Comments</h4>
                            </div>
                            <ul className="list-unstyled">{commentsList}</ul>
                </div>
            );
        }else{
            return (
                <div></div>
            );
        }

    }


    function DishDetail (props) {
        const dish = props.dish;
        
        if(dish != null){
            const comments = dish.comments;
            return (
                <div className="container">
                <div className="row">
                    <RenderDish dish = {dish} />
                    <RenderComments comments = {comments} />
                </div>
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }



export default DishDetail;
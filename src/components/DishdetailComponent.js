import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }


    renderDish(dish) {
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

    renderComments(comments) {
        if(comments!=null){

            const commentsList = comments.map((comment) => {
                const dateTime = new Date(comment.date);
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


    render() {

        const dish = this.props.dish;
        
        if(dish != null){
            const comments = dish.comments;
            return (
                <div className="container">
                <div className="row">
                    {this.renderDish(dish)}
                    {this.renderComments(comments)}
                </div>
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }

    }
}

export default DishDetail;
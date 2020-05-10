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

    getMonth(date){
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        return(month[date]);
    }

    renderComments(comments) {
        if(comments!=null){

            const commentsList = comments.map((comment) => {
                const dateTime = new Date(comment.date);
                return (
                    <li key={comment.id}>
                        {comment.comment}
                        <br></br>
                        -- {comment.author}, {this.getMonth(dateTime.getMonth())} {dateTime.getDate()+1}, {dateTime.getFullYear()}
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

        const dish = this.props.selectedDish;
        
        if(dish != null){
            const comments = dish.comments;
            return (
                <div className="row">
                    {this.renderDish(dish)}
                    {this.renderComments(comments)}
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
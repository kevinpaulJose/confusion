import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Label, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


    function RenderDish({dish}) {
        if(dish!=null){
            return (
                <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name}></CardImg>
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

    function RenderComments({comments, addComment, dishId}) {
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
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            );
        }else{
            return (
                <div></div>
            );
        }

    }


    function DishDetail (props) {
        if(props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish != null){
            return (
                <div className="container">
                     <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish = {props.dish} />
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }



const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return(
            <div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor='rating' md={12}>Rating</Label>
                            <Col>
                                <Control.select model=".rating" name="rating" id="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor='name' md={12}>Your Name</Label>
                            <Col>
                                <Control.text model=".author" name="author" id="author" className="form-control"
                                validators={{
                                    maxLength: maxLength(15),
                                    minLength: minLength(3)
                                }}
                                 placeholder="Your Name" />
                                 <Errors className="text-danger" model=".author" show="touched"
                                    messages={{
                                        maxLength: 'Must be 15 characters or less',
                                        minLength: 'Must be greater than 2 characters'
                                    }} />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label md={12} htmlFor='comment'>Comment</Label>
                            <Col>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                className="form-control" rows={6} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button color="primary" type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            <Button onClick={this.toggleModal} outline color="secondary"><i className="fa fa-pencil" aria-hidden="true"></i> Submit comment</Button>
            </div>
        );
    }
}



export default DishDetail;
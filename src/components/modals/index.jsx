
import "./style.scss"
import Form from "@form/form"
import Input from "@form/input"
import Button from "@ui/button"


const Modal = ({ className, saveEdited,show,setShow,title,setTitle }) => {

  

    const modalStyle = {
        display: show ? 'flex' : 'none'
    }
    return (
        <div style={modalStyle} className={className ? className : "modal-wrapper"}>
            <div className="modal-content">
                <i onClick={() => setShow(false)}className="bi bi-x-lg close"></i>

                <Form>
                    <Input
                        type="text"
                        val={title}
                        setVal={setTitle}
                        placeholder="enter task title" />
                </Form>

                <div className="flex btn-group">

                    <Button fun={saveEdited} className="save" title='save'/>
                    <Button fun={()=>setShow(false)} className="cancel" title='cancel'/>
                </div>
            </div>
        </div>
    );
};

export default Modal;







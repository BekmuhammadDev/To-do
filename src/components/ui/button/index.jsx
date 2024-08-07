

const index = ({type, className,fun,children,title})=>{
    return(
       <button type={type} className={className ? className : null} onClick={fun}> 
       {children ? children : (title ? title : '')}
       </button>
    );
};

export default index;


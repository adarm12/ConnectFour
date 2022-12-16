function DropButton(props){
    return (
        <button onClick={() => props.dropCircle(props.index)}>
            drop
        </button>
    )
}

export default DropButton
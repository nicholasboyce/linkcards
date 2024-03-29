const EditForm = ({user}) => {
    return (
        <>
        <form action={`/api/users/${user}`}></form>
        </>
    )
}

export default EditForm; 
function Registration() {
    return(
        <div className="Registration">
            <div className="form-section">
                <form>
                    <label for='email'>Email: </label>
                    <input type='text' id='email' name='email'/>
                    <label for='username'>Username: </label>
                    <input type='text' id='username' name='username'/>
                    <label for='password'>Password: </label>
                    <input type='text' id='password' name='password'/>
                    <label for='password2'>Confirm Password: </label>
                    <input type='text' id='password2' name='email'/>
                </form>
            </div>
        </div>
    )
}


export default Registration
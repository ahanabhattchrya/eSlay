function Registration() {
    return(
        <section className="Registration">
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
                    <div className="button-section">
                        <button className="button" type='submit'>Register</button>
                        <p>Already have an account? <a href='/login'>Log in here</a></p>
                    </div>
                </form>
            </div>
        </section>
    )
}


export default Registration
import "./HomePage.css"

export default function HomePage() {

    return (
        <div>
            <h1>Ny bruker</h1>
            <div className="signUpForm">
                <form>
                    <div className="form-row">
                        <label htmlFor="navn">Navn:</label>
                        <input id="navn" type="text"/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="passord">Passord:</label>
                        <input id="passord" type="password"/>
                    </div>
                    <button type="submit">Fortsett</button>
                </form>
            </div>
            <p>eller Logg inn</p>
        </div>
    )
}
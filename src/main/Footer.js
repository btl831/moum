export default function Footer() {
    return(
        <footer className="bg-dark footer">
        <div className="container">
            <a className="m-0 text-center text-white">
            Copyright &copy; Btl_831 2021<br/>
            <a onClick={() => { window.location.href = "/developer" }} style={{ color: "white" }}> developer</a>
            </a>
        </div>
        </footer>
    )
}
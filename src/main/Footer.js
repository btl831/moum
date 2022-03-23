export default function Footer() {
    return(
        <footer className="py-4 bg-dark">
        <div className="container">
            <p className="m-0 text-center text-white">
            Copyright &copy; Btl_831 2021
            </p>
            <a onClick={() => { window.location.href = "/developer" }} style={{ color: "white" }}> developer</a>
        </div>
        </footer>
    )
}
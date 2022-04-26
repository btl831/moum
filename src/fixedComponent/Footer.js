import styles from "./Footer.module.css";

export default function Footer() {
    if(window.location.pathname === "/") return null;
    return(
        <footer className="bg-dark" id={styles.footer}>
            <div className="container">
                <div className="text-center text-white">
                    Copyright &copy; Btl_831 2021<br/>
                    <p onClick={() => { window.location.href = "/developer" }} style={{ color: "white" }}> developer</p>
                </div>
            </div>
        </footer>
    )
}
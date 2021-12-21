import largeLogo from "../assets/imgs/largeLogo.png";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <img src={largeLogo} height="150px" />
                <ul className="socials">
                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                    <li><a href="#"><i className="fa fa-youtube"></i></a></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>copyright &copy;2022 The Flames</p>
            </div>
        </footer>
    )
}

export default Footer;
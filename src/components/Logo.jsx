import images from "../assets/Images";

const Logo = () => {
    return (
        <img
            className="mx-auto h-10 w-auto rounded"
            src={images.logo}
            alt="Your Company"
        />
    );
};

export default Logo;

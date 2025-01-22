import { Helmet } from "react-helmet-async";
import AboutSection from "../../components/HomeComponents/AboutSection/AboutSection";
import Articles from "../../components/HomeComponents/Articles/Articles";
import Banner from "../../components/HomeComponents/Banner/Banner";
import FeaturedClasses from "../../components/HomeComponents/FeaturedClasses/FeaturedClasses";
import FeaturedSection from "../../components/HomeComponents/FeaturedSection/FeaturedSection";
import NewsletterSection from "../../components/HomeComponents/NewsletterSection/NewsletterSection";
import Reviews from "../../components/HomeComponents/Reviews/Reviews";
import Trainers from "../../components/HomeComponents/Trainers/Trainers";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <AboutSection></AboutSection>
            <FeaturedClasses></FeaturedClasses>
            <Reviews></Reviews>
            <Articles></Articles>
            <NewsletterSection></NewsletterSection>
            <Trainers></Trainers>
        </div>
    );
};

export default Home;
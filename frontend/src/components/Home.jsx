import { Link } from 'react-router-dom'
import Header from './Header'

const Home = () => (
    <>
        <Header />
        <div className="flex flex-col justify-center items-center pt-10 pb-12 mx-auto w-11/12 max-w-6xl md:flex-row md:justify-between md:pt-24">
            <div className="flex flex-col items-center md:items-start">
                <h1 className="text-3xl font-bold text-gray-800 text-center md:text-4xl md:text-left">
                    Clothes That Get YOU Noticed
                </h1>
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
                    alt="clothes that get you noticed"
                    className="w-52 mt-6 md:hidden"
                />
                <p className="text-sm text-gray-600 mt-9 mb-0 text-center md:text-left md:text-lg md:mt-0">
                    Fashion is part of the daily air and it does not quite help that it
                    changes all the time. Clothes have always been a marker of the era and
                    we are in a revolution. Your fashion makes you been seen and heard
                    that way you are. So, celebrate the season's new and exciting fashion
                    in your own way.
                </p>
                <Link to="/products">
                    <button
                        type="button"
                        className="mt-6 py-3 px-6 bg-blue-700 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Shop Now
                    </button>
                </Link>
            </div>
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
                alt="clothes that get you noticed"
                className="hidden md:block w-1/2 max-w-xs ml-20"
            />
        </div>
    </>
)

export default Home

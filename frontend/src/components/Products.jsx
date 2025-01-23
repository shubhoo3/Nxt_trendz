import AllProductsSection from './AllProductsSection'
import PrimeDealsSection from './PrimeDealsSection'

import Header from './Header'


const Products = () => (
    <>
        <Header />
        <div className="flex flex-col mx-auto w-[90%] max-w-[1110px]">
            <PrimeDealsSection />
            <AllProductsSection />
        </div>
    </>
)

export default Products
import { BsFilterRight } from 'react-icons/bs'

const ProductsHeader = props => {
    const { sortbyOptions, activeOptionId } = props

    const onChangeSortby = event => {
        const { changeSortby } = props
        changeSortby(event.target.value)
    }

    return (
        <div className="flex justify-between items-center mt-6 flex-wrap md:mt-8">
            <h1 className="text-gray-600 font-roboto text-lg font-medium md:text-2xl">
                All Products
            </h1>
            <div className="flex items-center">
                <BsFilterRight className="text-2xl text-gray-600 mr-1.5" />
                <p className="text-gray-600 font-roboto text-base">Sort by</p>
                <select
                    className="text-gray-600 bg-white font-roboto text-base font-medium border-none p-3 outline-none cursor-pointer"
                    value={activeOptionId}
                    onChange={onChangeSortby}
                >
                    {sortbyOptions.map(eachOption => (
                        <option
                            key={eachOption.optionId}
                            value={eachOption.optionId}
                            className="text-gray-500 font-roboto text-sm"
                        >
                            {eachOption.displayText}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default ProductsHeader

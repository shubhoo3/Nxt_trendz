import { BsSearch } from 'react-icons/bs'

const FiltersGroup = props => {
    const renderRatingsFiltersList = () => {
        const { ratingsList } = props

        return ratingsList.map(rating => {
            const { changeRating, activeRatingId } = props
            const ratingClassName =
                activeRatingId === rating.ratingId
                    ? 'text-[#0967d2] font-medium'
                    : 'text-[#64748b]'

            const onClickRatingItem = () => changeRating(rating.ratingId)

            return (
                <li
                    className="flex items-center mb-3 cursor-pointer"
                    key={rating.ratingId}
                    onClick={onClickRatingItem}
                >
                    <img
                        src={rating.imageUrl}
                        alt={`rating ${rating.ratingId}`}
                        className="h-5 sm:h-6"
                    />
                    <p className={`ml-2 sm:ml-3 ${ratingClassName}`}>& up</p>
                </li>
            )
        })
    }

    const renderRatingsFilters = () => (
        <div>
            <h1 className="text-[#12022f] font-bold text-lg sm:text-xl mt-6 sm:mt-8 mb-4">
                Rating
            </h1>
            <ul className="p-0">{renderRatingsFiltersList()}</ul>
        </div>
    )

    const renderCategoriesList = () => {
        const { categoryOptions } = props

        return categoryOptions.map(category => {
            const { changeCategory, activeCategoryId } = props
            const onClickCategoryItem = () => changeCategory(category.categoryId)
            const isActive = category.categoryId === activeCategoryId
            const categoryClassName = isActive
                ? 'text-[#0967d2] font-medium'
                : 'text-[#64748b]'

            return (
                <li
                    className="list-none mt-4 sm:mt-6 cursor-pointer"
                    key={category.categoryId}
                    onClick={onClickCategoryItem}
                >
                    <p className={`text-base sm:text-lg ${categoryClassName}`}>
                        {category.name}
                    </p>
                </li>
            )
        })
    }

    const renderProductCategories = () => (
        <>
            <h1 className="text-[#12022f] font-bold text-lg sm:text-xl mt-6 sm:mt-8">
                Category
            </h1>
            <ul className="p-0">{renderCategoriesList()}</ul>
        </>
    )

    const onEnterSearchInput = event => {
        const { enterSearchInput } = props
        if (event.key === 'Enter') {
            enterSearchInput()
        }
    }

    const onChangeSearchInput = event => {
        const { changeSearchInput } = props
        changeSearchInput(event.target.value)
    }

    const renderSearchInput = () => {
        const { searchInput } = props
        return (
            <div className="flex items-center bg-[#f1f5f9] rounded-lg px-4 py-2">
                <input
                    value={searchInput}
                    type="search"
                    className="bg-[#f1f5f9] text-[#0f172a] font-medium text-sm flex-grow outline-none"
                    placeholder="Search"
                    onChange={onChangeSearchInput}
                    onKeyDown={onEnterSearchInput}
                />
                <BsSearch className="text-[#475569] w-5 h-5" />
            </div>
        )
    }

    const { clearFilters } = props

    return (
        <div className="mt-4 sm:mt-12 sm:w-1/4 max-w-xs">
            {renderSearchInput()}
            {renderProductCategories()}
            {renderRatingsFilters()}
            <button
                type="button"
                className="bg-white text-[#0967d2] font-bold text-xs sm:text-sm border border-[#0967d2] rounded-md px-3 sm:px-5 py-2 mt-4 sm:mt-8 cursor-pointer"
                onClick={clearFilters}
            >
                Clear Filters
            </button>
        </div>
    )
}

export default FiltersGroup

import initialState from "./initialState";

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'orders/add':
            const isItemAlreadyExists = state.cardItems.find(
                (item) => item.id === action.payload.id
            );

            if(!isItemAlreadyExists) {
                return {
                    ...state,
                    cardItems: [...state.cardItems, action.payload]
                };
            } else {
                return state;
            }
        case 'orders/remove':
            return {
                ...state,
                cardItems: state.cardItems.filter((item) => item.id !== action.payload)
            };
        default: 
            return state;
        }
    };

export default rootReducer;
import React, { Component } from 'react'
import Auxilary from '../../hoc/Auxilary'
import Burger from '../../components/Burger/Burger'
import Buildcontrols from '../../components/Burger/Buildcontrols/Burgercontrols'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGRIDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.8,
    cheese: 0.6,
    meat: 1.2
}

class BurgerBuilder extends Component {

    state = {
        ingredient: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        total_price: 4, 
        purchaseable:false, 
        purchasing:false
    }

    purchaseContinueHandler=()=>{
        alert('You continue')
    }

    purchaseCancelHandler=()=>{
          this.setState({purchasing:false})
    }

    purchaseHandler=()=>{
        this.setState({purchasing:true})

    }

    UpdatePurchaseState=(ingredients)=>{
         const sum =Object.keys(ingredients).map(el=>{
             return ingredients[el]
         }).reduce((acc,el)=>acc+el, 0);
         this.setState({purchaseable:sum>0})
    }

    addIngredientHandler = (type) => {
        const oldcount = this.state.ingredient[type];
        const updatecount = oldcount + 1;
        const updateingredient = { ...this.state.ingredient };
        updateingredient[type] = updatecount;
        
        const itemPrice = INGRIDIENT_PRICE[type];
        const oldprice = this.state.total_price;
        const updateprice = oldprice + itemPrice;
        this.setState({
            ingredient: updateingredient,
            total_price: updateprice
        })
        this.UpdatePurchaseState(updateingredient); 
    }

    removeIngredientHandler = (type) => {
        const oldcount = this.state.ingredient[type];
        if (oldcount <= 0) return;
        const updatecount = oldcount - 1;
        const updateingredient = { ...this.state.ingredient };
        updateingredient[type] = updatecount;

        const itemPrice = INGRIDIENT_PRICE[type];
        const oldprice = this.state.total_price;
        const updateprice = oldprice - itemPrice;
        this.setState({
            ingredient: updateingredient,
            total_price: updateprice
        })
        this.UpdatePurchaseState(updateingredient); 
    }


    render() {
        const disableitem = { ...this.state.ingredient }
        for (let key in disableitem) disableitem[key] = disableitem[key] <= 0
        return (
            <Auxilary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                   <OrderSummary 
                   ingredients={this.state.ingredient}
                   price={this.state.total_price}
                   purchaseCanceled={this.purchaseCancelHandler}
                   purchaseContinued={this.purchaseContinueHandler}/> 
                </Modal> 
                <Burger ingredient={this.state.ingredient} />
                <Buildcontrols
                    ingredientadded={this.addIngredientHandler}
                    ingredientremoved={this.removeIngredientHandler}
                    disable={disableitem}
                    purchaseable={this.state.purchaseable}
                    price={this.state.total_price}
                    ordered={this.purchaseHandler}
                />
            </Auxilary>
        )
    }
}

export default BurgerBuilder;
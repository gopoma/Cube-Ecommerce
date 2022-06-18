const stripe = Stripe("pk_test_51L9NxJD28vZl8nCxjym2k2xlkLTvH1iaRCihO9Hi1VWCS9cmrduJ3nHcUUFykQbvYSLWxmm446GlKndddE8vI0im00GxOSBXFi");

const form = document.querySelector("#payment-form");
const loadPaymentBtn = document.querySelector("#loadPayment");

loadPaymentBtn.onclick = async () => {
    initialize();
}

let elements;

const initialize = async () => {
    const response = await fetch("http://localhost:4000/api/cart/pay", {
        credentials: 'include'
    });

    const {clientSecret} = await response.json();

    const appereance = {
        theme: 'stripe'
    };

    elements = stripe.elements({ appereance, clientSecret });

    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");
}

form.onsubmit = async evt => {
    evt.preventDefault();

    const result = await stripe.confirmPayment({
        elements,
        redirect: 'if_required'
    })
    if(result.paymentIntent?.status === "succeeded") {
        fetch("http://localhost:4000/api/cart/paymentCompleted", {
            method: "POST",
            credentials: 'include'
        })
        .then(response => response.json())
        .then(console.log)
        .catch(console.log)
    }

    console.log(result);
}
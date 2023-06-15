import React from 'react'
import {useState, useEffect } from "react"
import { ArrowCircleUpIcon, ArrowCircleDownIcon } from '@heroicons/react/solid';

function Subscriptions({ categories, user }) {

    // Define the state variables for the category ids and the subscription status
    const [subscriptionStatus, setSubscriptionStatus] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categorySubscriptions, setCategorySubscriptions] = useState({});
    let currentUser = (sessionStorage.getItem("user"));
    let loggedInUser = JSON.parse(currentUser);

    const handleSubscribe = (category) => {
        // Make a POST request to create the subscription
        fetch('http://localhost:3000/subscriptions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('user')}`,
          },
          body: JSON.stringify({
            user_id: loggedInUser.id,
            category_id: category.id,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(loggedInUser.subscriptions);
            setSelectedCategories([...selectedCategories, category.id]);
            setSubscriptionStatus('Category subscribed successfully.');
          })
          .catch((error) => {
            console.log(error);
            setSubscriptionStatus('Error subscribing to category.');
          });
    };

    const handleUnsubscribe = (category) => {
      // Find the subscription object that matches the selected category
      const subscription = user.subscriptions.find(sub => sub.category_id === category.id);
      // Make a DELETE request to remove the subscription
      fetch(`http://localhost:3000/subscriptions/${subscription.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('user')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSelectedCategories(selectedCategories.filter((id) => id !== category.id));
          setSubscriptionStatus('Category unsubscribed successfully.');
        })
        .catch((error) => {
          console.log(error);
          setSubscriptionStatus('Error unsubscribing from category.');
        });
    };

    const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category.id)) {
        handleUnsubscribe(category);
    } else {
        handleSubscribe(category);
    }
    };

  return (
    <div className="flex flex-col justify-center items-center">
    <h2 className="text-2xl font-bold mb-4">Select categories to subscribe to:</h2>
    <div className="grid grid-cols-3 gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className={`p-4 rounded-lg shadow-md ${
            selectedCategories.includes(category.id)
          }`}
        >
          <h3 className="text-lg font-bold mb-2">{category.name}</h3>
          {selectedCategories.includes(category.id) ? (
            <button
              onClick={() => handleCategorySelect(category)}
              className="px-4 py-2 rounded-md bg-neutral-dark text-neutral-white hover:bg-neutral-gray focus:outline-none focus:ring-2 focus:ring-neutral-dark"
            >
              Unsubscribe
            </button>
          ) : (
            <button
              onClick={() => handleCategorySelect(category)}
              className="px-4 py-2 rounded-md bg-accent-color text-neutral-white hover:bg-neutral-dark focus:outline-none focus:ring-2 focus:ring-neutral-dark"
            >
              Subscribe
            </button>
          )}
        </div>
      ))}
    </div>
    {subscriptionStatus && (
      <p className="mt-4 text-lg font-bold text-neutral-dark">{subscriptionStatus}</p>
    )}
  </div>
  )
}

export default Subscriptions
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import ProductCard from '../index';

const dummyData = [
  {
    id: 1,
    title: 'Product1',
    description: 'Description 1',
    imageUrl:
      'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    price: 100,
    qty: 1,
  },
];

describe('<ProductCard />', () => {
  test('display should increment the quantity', () => {
    const { getByTestId } = render(<ProductCard />);
    const incrementButton = getByTestId('increment');
    fireEvent.click(incrementButton);
    expect(incrementButton).toBeTruthy();
  });
  test('display should decrement the quantity', () => {
    const { getByTestId } = render(<ProductCard />);
    const decrementButton = getByTestId('decrement');
    fireEvent.click(decrementButton);
    fireEvent.click(decrementButton);
    expect(decrementButton).toBeTruthy();
  });
  test('display should click the button', () => {
    localStorage.products = JSON.stringify(dummyData);
    window.setCount = () => {};
    const { getByTestId } = render(<ProductCard data={dummyData} />);
    const cartButton = getByTestId('cart-add');
    fireEvent.click(cartButton);
    expect(cartButton).toBeTruthy();
  });
});

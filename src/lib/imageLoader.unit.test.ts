import loader from './imageLoader'
import { describe, expect, test } from "vitest";

describe('cloudinaryLoader', () => {
  test('Check cloudinary url', () => {
    const input = "https://res.cloudinary.com/ddyd5lv06/image/upload/v1687214685/8721900573438274616_gmmfrf.jpg";
    const expected = "https://res.cloudinary.com/ddyd5lv06/image/upload/f_auto,c_limit,w_300,q_auto/8721900573438274616_gmmfrf.jpg"
    const output = loader({src: input, width: 300})
    expect(output).toBe(expected)
  });
  test('Check non-cloudinary url', () => {
    const input = "https://i.pinimg.com/736x/16/e1/d1/16e1d12cf49295519beac0270496923b.jpg";
    const expected = input;
    const output = loader({src: input, width: 300})
    expect(output).toBe(expected)
  });
  test('Check non url', () => {
    const input = "a.png";
    const expected = input;
    const output = loader({src: input, width: 300})
    expect(output).toBe(expected)
  })
})

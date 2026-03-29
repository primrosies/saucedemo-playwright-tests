import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Login', () => {

    test('should successfully login', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://www.saucedemo.com/');
    
    // Fill in credentials
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    
    // Click login button
    await page.click('#login-button');
    
    // Verify successful redirect to products page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
    });

    test('should show error message when password is incorrect', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');
    
    // Verify if error message is displayed
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
    });

});

test.describe('SauceDemo - Shopping Cart', () => {

    test('deve adicionar produto ao carrinho', async ({ page }) => {
    // Login first
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Add product to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Verify cart badge shows correct count
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('should remove product from cart', async ({ page }) => {
    // Faz login
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Add product
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Remove product
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    
    // Verify badge is no longer visible
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    });

});
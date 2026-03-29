import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Login', () => {

    test('deve fazer login com sucesso', async ({ page }) => {
    // Navega pro site
    await page.goto('https://www.saucedemo.com/');
    
    // Preenche credenciais
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    
    // Clica no botão de login
    await page.click('#login-button');
    
    // Verifica se chegou na página de produtos
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
    });

    test('deve mostrar erro ao tentar login com senha errada', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'senha_errada');
    await page.click('#login-button');
    
    // Verifica mensagem de erro
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
    });

});

test.describe('SauceDemo - Carrinho', () => {

    test('deve adicionar produto ao carrinho', async ({ page }) => {
    // Faz login primeiro
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Adiciona produto ao carrinho
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Verifica badge do carrinho
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('deve remover produto do carrinho', async ({ page }) => {
    // Faz login
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Adiciona produto
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Remove produto
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    
    // Verifica que badge sumiu
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    });

});
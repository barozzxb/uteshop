import AccountService from '../services/AccountService.js';

export const register = async (req, res) => {
    const { email, firstname, lastname, password } = req.body;
    const accountService = new AccountService();
    const result = await accountService.createAccount(email, firstname, lastname, password);
    if (!result.success) {
        return res.status(400).json({ message: result.message });
    }
    res.status(201).json({ message: result.message });
}

export const setActive = async (req, res) => {
    const { email} = req.body;
    const accountService = new AccountService();
    const result = await accountService.setActive(email);
    if (!result.success) {
        return res.status(400).json({ message: result.message });
    }
    res.status(200).json({ message: result.message });
}

export const getAccountByEmail = async (req, res) => {
    const { email } = req.params;
    const accountService = new AccountService();
    const result = await accountService.getAccountByEmail(email);
    if (!result.success) {
        return res.status(404).json({ message: result.message });
    }
    res.status(200).json(result.data);
}
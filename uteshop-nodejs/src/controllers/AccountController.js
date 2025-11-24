import AccountService from '../services/AccountService.js';

const accountService = new AccountService();

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await accountService.createAccount(email, password);
        if (!result.success) {
            return res.status(400).json(result);
        }
        return res.status(201).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error', data: null });
    }
};

export const setActive = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await accountService.setActive(email);
        if (!result.success) {
            return res.status(404).json(result);
        }
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error', data: null });
    }
};

export const getAccountByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const result = await accountService.getAccountByEmail(email);
        if (!result.success) {
            return res.status(404).json(result);
        }
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error', data: null });
    }
};
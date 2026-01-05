import accountService from '../services/AccountService.js';
import ApiResponse from '../utils/apiResponse.js';

/**
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
    try {
        const { email, password, firstname, lastname } = req.body;

        await accountService.createAccount(
            email,
            password,
            firstname,
            lastname
        );

        res.status(201).json(
            ApiResponse.success('Account created successfully')
        );
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/auth/activate
 */
export const setActive = async (req, res, next) => {
    try {
        const { email } = req.body;

        await accountService.setActive(email);

        res.status(200).json(
            ApiResponse.success('Account activated successfully')
        );
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/accounts/:email
 */
export const getAccountByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;

        const account = await accountService.getAccountByEmail(email);

        res.status(200).json(
            ApiResponse.success('Account found', account)
        );
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const data = await accountService.login(email, password);

        res.status(200).json(
            ApiResponse.success('Login successfully', data)
        );
    } catch (err) {
        next(err);
    }
};


export const getProfile = async (req, res, next) => {
    try {
        const email = req.user.email;
        console.log("Email from JWT:", email);

        const user = await accountService.getProfileByEmail(email);

        res.json(ApiResponse.success("Get profile success", user));
    } catch (err) {
        next(err);
    }
};


export const updateProfile = async (req, res, next) => {
    try {
        const email = req.user.email;
        const user = await accountService.updateProfile(email, req.body);
        res.json(ApiResponse.success("Update profile success", user));
    } catch (err) {
        next(err);
    }
};
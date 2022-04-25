import { generateAPIAction } from 'shared/core/services/redux';
import { types } from 'stores/types';

export const getApplications = generateAPIAction(types.GET_APPLICATIONS);
export const getAPIKeys = generateAPIAction(types.GET_API_KEYS);
export const getAPIKey = generateAPIAction(types.GET_API_KEY);
export const getWallets = generateAPIAction(types.GET_WALLETS);
export const getHistories = generateAPIAction(types.GET_HISTORIES);
export const getIps = generateAPIAction(types.GET_WHITE_LISTED_IPS);
export const getAdmins = generateAPIAction(types.GET_ADMINS);

export const approveUser = generateAPIAction(types.APPROVE_USER);
export const denyUser = generateAPIAction(types.DENY_USER);

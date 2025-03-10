import { SolutionistSkillTypes, UserTypes } from "../types/solutionistTypes";

export const emptySolutionistSkill: SolutionistSkillTypes = {
  id: 0,
  name: "",
  description: "",
  proficiencyLevel: "",
  fixPrice: 0,
};

export const emptyUser: UserTypes = {
  id: 0,
  name: "",
  email: "",
  password: "",
  role: "",
  username: "",
  passwordHash: "",
  phoneNumber: "",
  profilePicture: "",
  dateOfBirth: "",
  location: "",
  createdAt: "",
  updatedAt: "",
  termsAccepted: false,
  privacyPolicyAccepted: false,
  middleName: "",
  lastName: "",
  firstName: "",
  fullName: null,
  isVerified: false,
  verificationToken: null,
  resetPasswordToken: null,
  resetPasswordExpiration: null,
  lastLogin: null,
  loginAttempts: 0,
  isLocked: false,
  notificationPreferences: null,
  preferredTheme: null,
  gender: null,
  nationality: null,
  permissions: null,
  roleLevel: 0,
  lastLoginIp: null,
  deviceInfo: null,
  subscriptionType: null,
  subscriptionStatus: null,
  subscriptionStartDate: null,
  subscriptionEndDate: null,
  referralCode: null,
  referredBy: null,
  isDeleted: false,
  deletedAt: null,
};

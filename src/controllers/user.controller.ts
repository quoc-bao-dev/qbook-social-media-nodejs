import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service'; // Giả sử bạn đã tạo UserService

class UserController {
    async getUserInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId; // Lấy userId từ request parameters

            const userInfo = await UserService.getUserInfo(userId);

            if (!userInfo) {
                next(new Error('User not found'));
            }

            res.status(200).json(userInfo); // Trả về thông tin người dùng
        } catch (error) {
            next(error); // Gọi next để xử lý lỗi
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id as string; // Lọc userId tuong tác user hien tai
            const data = req.body;

            delete data.hashedPassword;
            delete data.friends
            delete data.followers
            delete data.following
            delete data.createdAt
            delete data.email
            delete data._id

            if (!userId) {
                next(new Error('User not found'));
            }

            const updatedUser = await UserService.updateUser(userId, data);

            if (!updatedUser) {
                next(new Error('User not updated'));
            }

            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
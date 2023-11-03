import UserModal from "../Modals/User.model.js";

export const checkUserId = async (req, res, next) => {
    try {
        const { id } = req.body;
        const user = await UserModal.findById(id);
        if (user) {
            next();
        } else {
            return res.status(404).json({ message: "user not fond", success: false })
        }
    } catch (error) {
        return res.status(500).json({ message: "user not fond", success: false  })
    }
}
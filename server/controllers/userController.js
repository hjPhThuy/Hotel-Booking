export const getUserData = async (req, res) => {
    try {
        const user = req.user;
        res.json({ success: true, user })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const storeRencentSearchedCities = async (req, res) => {
    try {
        const { recentSearchedCity } = req.body;
        const user = await req.user;

        if (user.recentSearchedCities.length < 3) {
            user.recentSearchedCities.push(recentSearchedCity)
        } else {
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCity)
        }
        await user.save();
        res.json({ success: true, role, message: "Đã thêm thành phố" })

    } catch (error) {
        res.json({ success: false, role, message: error.message })
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { username, phone, address } = req.body;
        const user = req.user;

        if (username) user.username = username;
        if (phone) user.phone = phone;
        if (address) user.address = address;

        await user.save();
        res.json({ success: true, message: "Cập nhật hồ sơ thành công", user });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
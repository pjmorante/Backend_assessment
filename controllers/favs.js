const { response } = require("express");
const Favs = require("../models/favs");

const getFavs = async (req, res = response) => {

    const favsList = await Favs.find().populate('user', 'name');

    res.json({
        ok: true,
        msg: 'getFavs'
    })
}

const createFavs = async (req, res = response) => {

    const favs = new Favs(req.body);

    try {
        favs.user = req.id;
        const savedFavs = await favs.save();
        res.json({
            ok: true,
            fav: savedFavs
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Something went grong"
        })
    }
}

const updateFavs = async (req, res = response) => {

    const favId = req.params.id;
    const uid = req.uid;

  try {
    const fav = await Favs.findById(favId);
    if (!fav) {
      return res.status(404).json({
        ok: false,
        msg: "Fav does not exist",
      });
    }
    if (fav.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Unauthorized",
      });
    }
    const newFav = {
      ...req.body,
      user: uid,
    };
    const updatedFav = await Favs.findByIdAndUpdate(
      favId,
      newFav,
      { new: true }
    );
    res.json({
      ok: true,
      fav: "Fav updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Something went wrong",
    });
  }
}

const deleteFavs = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteFavs'
    })
}

module.exports = {
    getFavs,
    createFavs,
    updateFavs,
    deleteFavs
}
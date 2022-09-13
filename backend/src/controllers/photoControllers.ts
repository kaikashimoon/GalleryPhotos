import { Request, Response} from "express";
import Photo from "../models/Photo";
import {unlink} from "fs-extra";
import path from "path";

export const getPhoto = async (req: Request, res: Response) =>  {
    try {
        const findPhotos = await Photo.find();
        return res.status(201).json(findPhotos);
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
}

export const getOnePhoto = async (req: Request, res: Response) => { 
    try {
        const findPhoto = await Photo.findById(req.params.id);
        if (!findPhoto) {
            return res.status(404).json({ message: 'Photo not found' })
        } 
        return res.status(201).json(findPhoto);
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
}

export const createPhoto = async (req: Request, res: Response) => {
  try {
    const {title, description} = req.body;
    const newPhoto = {
        title: title,
        description: description,
        imagePath: req.file?.path
    }
    const savedPhoto = new Photo(newPhoto);
    await savedPhoto.save();
    return res.status(201).json({message: "Photo successfully created"})
  } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
  }
}

export const updatePhoto = async (req: Request, res: Response) => {
    try {
        const findPhoto = await Photo.findById(req.params.id);
        if (!findPhoto) {
            return res.status(404).json({ message: 'Photo not found' })
        } 
        const findPhotoAndUpdate = await Photo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          })
        return res.status(201).json(findPhotoAndUpdate)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
}

export const deletePhoto = async (req: Request, res: Response) => {
    try {
        const findPhoto = await Photo.findById(req.params.id)
        if (!findPhoto) {
            return res.status(404).json({ message: 'Photo not found' })
        } 
        const photo = await findPhoto?.delete();
        if(photo){
            await unlink(path.resolve('./' + photo.imagePath));
        }
        return res.status(201).json({ message: 'Photo deleted successfully' })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
}



## Usage
You use tajs by forking the repository and then modifying the content structure to suit
your game. You are of course also welcome to modify the framework itself. After you
have done the changes, simply put the files on a webserver. In theory you can also bundle
the repository to allow offline use, however this is not guarranteed to work in every
browser as not all allow javascript to load local files.

### Structure of tajs
The base content structure of tajs is the scene. A scene consists (at the moment) of a
description and a list of options that lead to other scenes. Scenes can optionally
have an image assigned. Let's look at the structure of a scene used in the demo:
```
{
    "name": "Test Scene",
    "image": "assets/images/scene/town.jpg",
    "alt_text": "The view on a city from a tall building",
    "description": "A test scene stretches before you. You can see unlimited potential but nothing concrete. Everything has all the colors and none at once. All the shapes and yet shapeless. You decide not to do drugs anymore.<br><br>After you come to your senses, you realize you are on top of a church tower, overlooking your home city. You have no memory of how you got here, but the blood-stained sweater you're wearing might offer a first clue as to the last hour's happenings. You are now slightly worried.",
    "options": [
        {
            "text": "Do nothing and enjoy the view",
            "proceed": "test_scene/test_scene_stay"
        },
        {
            "text": "Jump down and land on both feet",
            "proceed": "test_scene/test_scene_jump"
        },
        {
            "text": "Climb inside and use the stairs",
            "proceed": "test_scene/test_scene_stairs"
        }
    ]
}
```
**name:** The name currently does not have much use and does not need to be unique.

**image:** This property is a relative URL that points to the image that should be
used for the scene.

**alt_text:** If an image is given, this property will fill the alt attribute of the
image tag. This is useful if the image can't be displayed or for certain accessability
tools.

**description:** This is the description of the scene, so the actual content. Note that
the JSON format does not allow line breaks. As the description will be inserted into the
DOM, you can write valid HTML code for formating or, technically, HTML injection into
your game.

**options:** This property is a list of option objects that each describe the displayed
text of an option and which scene will be loaded if the user selects the option. An ending
scene is then simply a scene with no options.
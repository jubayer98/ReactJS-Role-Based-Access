import { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';


const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [name, setName] = useState(user?.displayName || '');
    const [photoUrl, setPhotoUrl] = useState(user?.photoURL || '');

    const handleUpdateProfile = async () => {
        try {
            await updateUserProfile(name, photoUrl);
            alert('Profile updated successfully!');
        } catch (error) {
            alert('Error updating profile:', error.message);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-emerald-500 text-xl font-bold">Profile</h2>
            <div className="mt-4">
                {user && (
                    <img src={user.photoURL} alt="Profile Photo" className="w-20 h-20" />
                )}
                <div className="mt-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="mt-1 block w-full"
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">Photo URL</label>
                    <input
                        id="photoUrl"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        placeholder="Enter your photo URL"
                        className="mt-1 block w-full"
                    />
                </div>
                <div className="mt-6">
                    <button onClick={handleUpdateProfile} className="bg-emerald-500 hover:bg-emerald-600">
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;

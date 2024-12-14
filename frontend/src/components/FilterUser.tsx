import React, { useState } from 'react';

interface FilterProps {
    hideRoleFilter?: boolean;
    setFilterObject: (filter: FilterObject) => void;
}

interface FilterObject {
    role: 'mentor' | 'mentee' | '';
    name: string;
    skills: string[];
    interests: string[];
}

const Filter: React.FC<FilterProps> = ({ setFilterObject, hideRoleFilter = true }) => {
    const [role, setRole] = useState<'mentor' | 'mentee' | ''>('');
    const [name, setName] = useState<string>('');
    const [skills, setSkills] = useState<string>('');
    const [interests, setInterests] = useState<string>('');
    const [skillsChips, setSkillsChips] = useState<string[]>([]);
    const [interestsChips, setInterestsChips] = useState<string[]>([]);

    const applyFilters = () => {
        const filterObject: FilterObject = {
            role,
            name,
            skills: skillsChips,
            interests: interestsChips,
        };

        console.log('Filter Object:', filterObject); // For debugging
        setFilterObject(filterObject); // Pass the filter object to the parent component
    };

    const clearFilters = () => {
        setRole('');
        setName('');
        setSkills('');
        setInterests('');
        setSkillsChips([]);
        setInterestsChips([]);
        setFilterObject({ role: '', name: '', skills: [], interests: [] }); // Reset filter object
    };

    const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && skills.trim()) {
            if (!skillsChips.includes(skills.trim())) {
                setSkillsChips([...skillsChips, skills.trim()]);
                setSkills('');
            }
        }
    };

    const handleInterestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && interests.trim()) {
            if (!interestsChips.includes(interests.trim())) {
                setInterestsChips([...interestsChips, interests.trim()]);
                setInterests('');
            }
        }
    };

    const removeSkill = (skill: string) => {
        setSkillsChips(skillsChips.filter(s => s !== skill));
    };

    const removeInterest = (interest: string) => {
        setInterestsChips(interestsChips.filter(i => i !== interest));
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col space-y-4">
            <h2 className="text-lg font-bold">Filter Users</h2>
            <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="block">Name:</label>
                <input
                    type="text"
                    id="name"
                    className="border rounded p-2 w-full text-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Search by name"
                    aria-label="Search by name"
                />
            </div>
            <div className="flex flex-row justify-between space-x-2">
                {hideRoleFilter && <div className="flex-1">
                    <label htmlFor="role" className="block">Role:</label>
                    <select
                        id="role"
                        className="border rounded p-2 w-full text-sm"
                        value={role}
                        onChange={(e) => setRole(e.target.value as 'mentor' | 'mentee')}
                        aria-label="Select role"
                    >
                        <option value="">Select Role</option>
                        <option value="mentor">Mentor</option>
                        <option value="mentee">Mentee</option>
                    </select>
                </div>}
                <div className="flex-1">
                    <label htmlFor="skills" className="block">Skills:</label>
                    <input
                        type="text"
                        id="skills"
                        className="border rounded p-2 w-full text-sm"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="Press Enter to add skill"
                        onKeyDown={handleSkillKeyDown}
                        aria-label="Add skill"
                    />
                    < div className="mt-1 flex flex-wrap">
                        {skillsChips.map((skill, index) => (
                            <span key={index} className="bg-blue-200 text-blue-800 rounded-full px-2 py-1 text-xs mr-2 mb-2 flex items-center">
                                {skill}
                                <button onClick={() => removeSkill(skill)} className="ml-1 text-red-500">x</button>
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    <label htmlFor="interests" className="block">Interests:</label>
                    <input
                        type="text"
                        id="interests"
                        className="border rounded p-2 w-full text-sm"
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                        placeholder="Press Enter to add interest"
                        onKeyDown={handleInterestKeyDown}
                        aria-label="Add interest"
                    />
                    <div className="mt-1 flex flex-wrap">
                        {interestsChips.map((interest, index) => (
                            <span key={index} className="bg-green-200 text-green-800 rounded-full px-2 py-1 text-xs mr-2 mb-2 flex items-center">
                                {interest}
                                <button onClick={() => removeInterest(interest)} className="ml-1 text-red-500">x</button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex space-x-2">
                <button onClick={applyFilters} className="bg-blue-600 text-white rounded p-2 flex-1">Apply Filters</button>
                <button onClick={clearFilters} className="bg-gray-300 text-black rounded p-2 flex-1">Clear Filters</button>
            </div>
        </div>
    );
};

export default Filter;
import React from "react";

const SideFilter = () => {
    return (
    <div className="relative">
        <div className='flex flex-col gap-2  py-2 px-5 rounded-md h-full'>
        <p className='font-bold'>Job type</p>
        <label className='flex items-center gap-2'>
            <input type="checkbox" />
            Full Time
        </label>
        <label className='flex items-center gap-2'>
            <input type="checkbox" />
            Part Time
        </label>
        <label className='flex items-center gap-2'>
            <input type="checkbox" />
            Remote
        </label>
        <label className='flex items-center gap-2'>
            <input type="checkbox" />
            Internship
        </label>
        <p className='font-bold'>Location</p>
        <select className='border border-gray-300 rounded-md'>
            <option value="">All</option>
            <option value="">Remote</option>
            <option value="">In Office</option>
            <option value="">Hybrid</option>
        </select>
        <p className='font-bold'>Salary range</p>
        <select className='border border-gray-300 rounded-md'>
            <option value="">All</option>
            <option value="">$0 - $50k</option>
            <option value="">$50k - $100k</option>
            <option value="">$100k+</option>
        </select>
        <p className='font-bold'>Experience level</p>
        {/* checkboxes */}
        <label className='flex items-center gap-2' >
            <input type="checkbox" />
            Entry level
        </label>
        <label className='flex items-center gap-2 '>
            <input type="checkbox" 
            className='border border-gray-300 rounded-md'
            />
            Mid level



        </label>
        <label className='flex items-center gap-2'>
            <input type="checkbox" />
            Senior level
        </label>
    </div>
    </div>
    );
}

export default SideFilter;


       
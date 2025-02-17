import React from 'react';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';
import Edubot from '../../assets/edubot_logo.svg'; 

const BaseEdubotHeader: React.FC = () => {  
  return (
    <header className="flex justify-start items-center bg-[#D3ECFD] border-b-2 border-b text-primary h-16 px-4 lg:px-6">
      <div className="flex items-center w-full ml-12 lg:ml-0">
        <img src={Edubot} alt="Logo" className="h-8" />
        <Separator orientation="vertical" className='w-1 bg-primary mx-4 lg:mx-6 h-4/5' />
        <div className="text-sm lg:text-lg font-medium flex-grow truncate">
          Hello Kranthi, Welcome to Edubot LMS Platform
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="w-5 h-5 lg:w-6 lg:h-6" />
          <Avatar className='w-7 h-7 lg:w-8 lg:h-8'>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>KR</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default BaseEdubotHeader;
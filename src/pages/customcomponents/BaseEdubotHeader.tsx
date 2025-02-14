import React from 'react';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';
import Edubot from '../../assets/edubot_logo.svg'; 

const BaseEdubotHeader: React.FC = () => {  
  return (
    <header className="flex justify-start items-center p-3 bg-[#D3ECFD] border-b-2 border-b text-primary h-16">
      <img src={Edubot} alt="Logo" className="pl-6" />
      <Separator orientation="vertical" className='w-1 bg-primary mx-6 h-4/5' />
      <div className="text-lg font-medium flex-grow">Hello Kranthi, Welcome to Edubot LMS Platform</div>
      <div className="flex items-center space-x-4">
        <div className="flex-grow"></div>
        <Bell className="w-6 h-6" />
        <Avatar className='w-8 h-8'>
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>KR</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default BaseEdubotHeader;
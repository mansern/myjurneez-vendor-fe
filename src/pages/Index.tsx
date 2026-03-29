import { Button } from "@/components/ui/button"; // Assuming you have Shadcn UI
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md p-8 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          MyJurneez Portal
        </h1>
        <p className="mb-6 text-gray-600">
          Welcome to the MyJurneez ecosystem. Your application code starts here.
        </p>
        <div className="flex gap-4 justify-center">
          <Button>Get Started</Button>
          <Button variant="outline">Documentation</Button>
        </div>
      </Card>
    </div>
  );
};

export default Index;